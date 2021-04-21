import { container } from 'tsyringe';

import '@shared/providers';

import UsersRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IUsersRepository from '@modules/user/repositories/IUserRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokenRepository';
import IUserTokenRepository from '@modules/user/repositories/IUserTokenRepository';
import IInterestPointRepository from '@modules/rawdata/repositories/IInterestPointRepository';
import InterestPointRepository from '@modules/rawdata/infra/typeorm/repositories/InterestPointRepository';
import IInterestPointTypeRepository from '@modules/rawdata/repositories/IInterestPointTypeRepository';
import InterestPointTypeRepository from '@modules/rawdata/infra/typeorm/repositories/InterestPointTypeRepository';
import ITouristSpotRepository from '@modules/rawdata/repositories/ITouristSpotRepository';
import TouristSpotRepository from '@modules/rawdata/infra/typeorm/repositories/TouristSpotRepository';
import ITouristSpotPhotoRepository from '@modules/rawdata/repositories/ITouristSpotPhotoRepository';
import TouristSpotPhotoRepository from '@modules/rawdata/infra/typeorm/repositories/TouristSpotPhotoRepository';
import PostRepository from '@modules/social/infra/typeorm/repositories/PostRepository';
import IPostRepository from '@modules/social/repositories/IPostRepository';
import CommentRepository from '@modules/social/infra/typeorm/repositories/CommentRepository';
import ICommentRepository from '@modules/social/repositories/ICommentRepository';
import ILikeRepository from '@modules/social/repositories/ILikeRepository';
import LikeRepository from '@modules/social/infra/typeorm/repositories/LikeRepository';
import PhotoPostRepository from '@modules/social/infra/typeorm/repositories/PhotoPostRepository';
import IPhotoPostRepository from '@modules/social/repositories/IPhotoPostRepository';
import IProjectRepository from '@modules/project/repositories/IProjectRepository';
import ProjectRepository from '@modules/project/infra/typeorm/repositories/ProjectRepository';
import IProjectCommentRepository from '@modules/project/repositories/ICommentProjectRepository';
import ProjectCommentRepository from '@modules/project/infra/typeorm/repositories/CommentProjectRepository';
import IProjectPhotoRepository from '@modules/project/repositories/IPhotoProjectRepository';
import ProjectPhotoRepository from '@modules/project/infra/typeorm/repositories/PhotoProjectRepository';

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
