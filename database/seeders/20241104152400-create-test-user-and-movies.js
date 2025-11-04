'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    // Create admin user
    const userId = uuidv4();
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'admin@gmail.com' LIMIT 1`
    );
    
    let finalUserId = userId;
    if (users.length > 0) {
      finalUserId = users[0].id;
      // Update password if user exists
      await queryInterface.sequelize.query(
        `UPDATE users SET password = :password WHERE email = 'admin@gmail.com'`,
        {
          replacements: { password: hashedPassword },
        }
      );
    } else {
      await queryInterface.bulkInsert('users', [
        {
          id: finalUserId,
          email: 'admin@gmail.com',
          password: hashedPassword,
          name: 'Admin User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    // Delete existing movies for this user if any
    await queryInterface.bulkDelete('movies', {
      userId: finalUserId,
    });

    // Create dummy movies for the admin user
    const movies = [
      {
        id: uuidv4(),
        title: 'The Matrix',
        publishingYear: 1999,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'Inception',
        publishingYear: 2010,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'Interstellar',
        publishingYear: 2014,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'The Dark Knight',
        publishingYear: 2008,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'Pulp Fiction',
        publishingYear: 1994,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'Forrest Gump',
        publishingYear: 1994,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'The Shawshank Redemption',
        publishingYear: 1994,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'The Godfather',
        publishingYear: 1972,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'Fight Club',
        publishingYear: 1999,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        publishingYear: 2001,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'Avatar',
        publishingYear: 2009,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'Titanic',
        publishingYear: 1997,
        poster: null,
        userId: finalUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('movies', movies);
  },

  async down(queryInterface, Sequelize) {
    // Delete movies first (due to foreign key constraint)
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'admin@gmail.com' LIMIT 1`
    );
    
    if (users.length > 0) {
      await queryInterface.bulkDelete('movies', {
        userId: users[0].id,
      });
    }
    
    // Delete admin user
    await queryInterface.bulkDelete('users', {
      email: 'admin@gmail.com',
    });
  },
};

