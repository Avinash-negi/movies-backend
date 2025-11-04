import { translate } from './translations';

export const API_DESCRIPTIONS = {
  auth: {
    login: {
      summary: translate('auth.login.summary'),
      description: translate('auth.login.description'),
      successDescription: translate('auth.login.successDescription'),
      errorDescription: translate('auth.login.errorDescription'),
    },
    register: {
      summary: translate('auth.register.summary'),
      description: translate('auth.register.description'),
      successDescription: translate('auth.register.successDescription'),
      errorDescription: translate('auth.register.errorDescription'),
    },
    dto: {
      email: translate('auth.dto.emailDescription'),
      password: translate('auth.dto.passwordDescription'),
      name: translate('auth.dto.nameDescription'),
      userInfo: translate('auth.dto.userInfoDescription'),
      jwtToken: translate('auth.dto.jwtTokenDescription'),
    },
  },
  movies: {
    get notFound() { return translate('movies.notFound'); },
    getAll: {
      summary: translate('movies.getAll.summary'),
      description: translate('movies.getAll.description'),
      successDescription: translate('movies.getAll.successDescription'),
    },
    getOne: {
      summary: translate('movies.getOne.summary'),
      description: translate('movies.getOne.description'),
      successDescription: translate('movies.getOne.successDescription'),
      paramDescription: translate('movies.getOne.paramDescription'),
    },
    create: {
      summary: translate('movies.create.summary'),
      description: translate('movies.create.description'),
      successDescription: translate('movies.create.successDescription'),
    },
    update: {
      summary: translate('movies.update.summary'),
      description: translate('movies.update.description'),
      successDescription: translate('movies.update.successDescription'),
    },
    delete: {
      summary: translate('movies.delete.summary'),
      description: translate('movies.delete.description'),
      successDescription: translate('movies.delete.successDescription'),
    },
    dto: {
      title: translate('movies.dto.titleDescription'),
      publishingYear: translate('movies.dto.publishingYearDescription'),
      poster: translate('movies.dto.posterDescription'),
      posterUrl: translate('movies.dto.posterUrlDescription'),
      movieId: translate('movies.dto.movieIdDescription'),
      userId: translate('movies.dto.userIdDescription'),
      createdAt: translate('movies.dto.createdAtDescription'),
      updatedAt: translate('movies.dto.updatedAtDescription'),
      posterFile: translate('movies.dto.posterFileDescription'),
    },
    query: {
      page: translate('movies.query.pageDescription'),
      limit: translate('movies.query.limitDescription'),
    },
  },
  common: {
    unauthorized: translate('common.unauthorized'),
    badRequest: translate('common.badRequest'),
    notFound: translate('common.notFound'),
  },
  swagger: {
    title: translate('swagger.title'),
    description: translate('swagger.description'),
    jwtTokenDescription: translate('swagger.jwtTokenDescription'),
    authTag: translate('swagger.authTag'),
    moviesTag: translate('swagger.moviesTag'),
  },
};

