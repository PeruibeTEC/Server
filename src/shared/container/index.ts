import { container } from 'tsyringe';

import '@shared/providers';

import UsersRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IUsersRepository from '@modules/user/repositories/IUserRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokenRepository';
import IUserTokenRepository from '@modules/user/repositories/ITokenRepository';

import TouristRepository from '@modules/user/infra/typeorm/repositories/TouristRepository';
import ITouristRepository from '@modules/user/repositories/ITouristRepository';

import InterestPointTypeRepository from '@modules/rawdata/infra/typeorm/repositories/InterestPointTypeRepository';
import IInterestPointTypeRepository from '@modules/rawdata/repositories/IInterestPointTypeRepository';
import InterestPointRepository from '@modules/rawdata/infra/typeorm/repositories/InterestPointRepository';
import IInterestPointRepository from '@modules/rawdata/repositories/IInterestPointRepository';

import TouristSpotPhotoRepository from '@modules/rawdata/infra/typeorm/repositories/TouristSpotPhotoRepository';

import ITouristSpotPhotoRepository from '@modules/rawdata/repositories/ITouristSpotPhotoRepository';
import TouristSpotRepository from '@modules/rawdata/infra/typeorm/repositories/TouristSpotRepository';
import ITouristSpotRepository from '@modules/rawdata/repositories/ITouristSpotRepository';

import PostRepository from '@modules/social/infra/typeorm/repositories/PostRepository';
import IPostRepository from '@modules/social/repositories/IPostRepository';
import CommentRepository from '@modules/social/infra/typeorm/repositories/CommentRepository';
import ICommentRepository from '@modules/social/repositories/ICommentRepository';
import LikeRepository from '@modules/social/infra/typeorm/repositories/LikeRepository';
import ILikeRepository from '@modules/social/repositories/ILikeRepository';
import PhotoPostRepository from '@modules/social/infra/typeorm/repositories/PhotoPostRepository';
import IPhotoPostRepository from '@modules/social/repositories/IPhotoPostRepository';

import ProjectRepository from '@modules/project/infra/typeorm/repositories/ProjectRepository';
import IProjectRepository from '@modules/project/repositories/IProjectRepository';

import ProjectCommentRepository from '@modules/project/infra/typeorm/repositories/CommentProjectRepository';
import IProjectCommentRepository from '@modules/project/repositories/ICommentProjectRepository';

import ProjectPhotoRepository from '@modules/project/infra/typeorm/repositories/PhotoProjectRepository';
import IProjectPhotoRepository from '@modules/project/repositories/IPhotoProjectRepository';

import BusinessTypeRepository from '@modules/business/infra/typeorm/repositories/BusinessTypeRepository';
import IBusinessTypeRepository from '@modules/business/repositories/IBusinessTypeRepository';
import BusinessRepository from '@modules/business/infra/typeorm/repositories/BusinessRepository';
import IBusinessRepository from '@modules/business/repositories/IBusinessRepository';
import BusinessContactRepository from '@modules/business/infra/typeorm/repositories/BusinessContactRepository';
import IBusinessContactRepository from '@modules/business/repositories/IBusinessContactRepository';
import BusinessLocationRepository from '@modules/business/infra/typeorm/repositories/BusinessLocationRepository';
import IBusinessLocationRepository from '@modules/business/repositories/IBusinessLocationRepository';
import BusinessProductRepository from '@modules/business/infra/typeorm/repositories/BusinessProductRepository';
import IBusinessProductRepository from '@modules/business/repositories/IBusinessProductRepository';
import BusinessCommentRepository from '@modules/business/infra/typeorm/repositories/BusinessCommentRepository';
import IBusinessCommentRepository from '@modules/business/repositories/IBusinessCommentRepository';
import BusinessRatingRepository from '@modules/business/infra/typeorm/repositories/BusinessRatingRepository';
import IBusinessRatingRepository from '@modules/business/repositories/IBusinessRatingRepository';

import EventTypeBusinessRepository from '@modules/business/infra/typeorm/repositories/EventTypeBusinessRepository';
import IEventTypeBusinessRepository from '@modules/business/repositories/IEventTypeBusinessRepository';
import EventBusinessRepository from '@modules/business/infra/typeorm/repositories/EventBusinessRepository';
import IEventBusinessRepository from '@modules/business/repositories/IEventBusinessRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);

container.registerSingleton<IInterestPointRepository>(
  'InterestPointRepository',
  InterestPointRepository,
);

container.registerSingleton<IInterestPointTypeRepository>(
  'InterestPointTypeRepository',
  InterestPointTypeRepository,
);

container.registerSingleton<ITouristSpotRepository>(
  'TouristSpotRepository',
  TouristSpotRepository,
);

container.registerSingleton<ITouristSpotPhotoRepository>(
  'TouristSpotPhotoRepository',
  TouristSpotPhotoRepository,
);

container.registerSingleton<IPostRepository>('PostRepository', PostRepository);

container.registerSingleton<ICommentRepository>(
  'CommentRepository',
  CommentRepository,
);

container.registerSingleton<ILikeRepository>('LikeRepository', LikeRepository);

container.registerSingleton<IPhotoPostRepository>(
  'PhotoPostRepository',
  PhotoPostRepository,
);

container.registerSingleton<IProjectRepository>(
  'ProjectRepository',
  ProjectRepository,
);

container.registerSingleton<IProjectCommentRepository>(
  'ProjectCommentRepository',
  ProjectCommentRepository,
);

container.registerSingleton<IProjectPhotoRepository>(
  'ProjectPhotoRepository',
  ProjectPhotoRepository,
);

container.registerSingleton<IEventTypeBusinessRepository>(
  'EventTypeBusinessRepository',
  EventTypeBusinessRepository,
);

container.registerSingleton<IEventBusinessRepository>(
  'EventBusinessRepository',
  EventBusinessRepository,
);

container.registerSingleton<IBusinessTypeRepository>(
  'BusinessTypeRepository',
  BusinessTypeRepository,
);

container.registerSingleton<IBusinessRepository>(
  'BusinessRepository',
  BusinessRepository,
);

container.registerSingleton<IBusinessContactRepository>(
  'BusinessContactRepository',
  BusinessContactRepository,
);

container.registerSingleton<IBusinessLocationRepository>(
  'BusinessLocationRepository',
  BusinessLocationRepository,
);

container.registerSingleton<IBusinessProductRepository>(
  'BusinessProductRepository',
  BusinessProductRepository,
);

container.registerSingleton<IBusinessCommentRepository>(
  'BusinessCommentRepository',
  BusinessCommentRepository,
);

container.registerSingleton<IBusinessRatingRepository>(
  'BusinessRatingRepository',
  BusinessRatingRepository,
);

container.registerSingleton<ITouristRepository>(
  'TouristRepository',
  TouristRepository,
);
