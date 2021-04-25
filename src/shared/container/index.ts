import ProjectCommentRepository from '@modules/project/infra/typeorm/repositories/CommentProjectRepository';
import ProjectPhotoRepository from '@modules/project/infra/typeorm/repositories/PhotoProjectRepository';
import ProjectRepository from '@modules/project/infra/typeorm/repositories/ProjectRepository';
import IProjectCommentRepository from '@modules/project/repositories/ICommentProjectRepository';
import IProjectPhotoRepository from '@modules/project/repositories/IPhotoProjectRepository';
import IProjectRepository from '@modules/project/repositories/IProjectRepository';
import InterestPointRepository from '@modules/rawdata/infra/typeorm/repositories/InterestPointRepository';
import InterestPointTypeRepository from '@modules/rawdata/infra/typeorm/repositories/InterestPointTypeRepository';
import TouristSpotPhotoRepository from '@modules/rawdata/infra/typeorm/repositories/TouristSpotPhotoRepository';
import TouristSpotRepository from '@modules/rawdata/infra/typeorm/repositories/TouristSpotRepository';
import IInterestPointRepository from '@modules/rawdata/repositories/IInterestPointRepository';
import IInterestPointTypeRepository from '@modules/rawdata/repositories/IInterestPointTypeRepository';
import ITouristSpotPhotoRepository from '@modules/rawdata/repositories/ITouristSpotPhotoRepository';
import ITouristSpotRepository from '@modules/rawdata/repositories/ITouristSpotRepository';
import CommentRepository from '@modules/social/infra/typeorm/repositories/CommentRepository';
import LikeRepository from '@modules/social/infra/typeorm/repositories/LikeRepository';
import PhotoPostRepository from '@modules/social/infra/typeorm/repositories/PhotoPostRepository';
import PostRepository from '@modules/social/infra/typeorm/repositories/PostRepository';
import ICommentRepository from '@modules/social/repositories/ICommentRepository';
import ILikeRepository from '@modules/social/repositories/ILikeRepository';
import IPhotoPostRepository from '@modules/social/repositories/IPhotoPostRepository';
import IPostRepository from '@modules/social/repositories/IPostRepository';
import TouristRepository from '@modules/user/infra/typeorm/repositories/TouristRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokenRepository';
import '@modules/user/providers';
import ITouristRepository from '@modules/user/repositories/ITouristRepository';
import IUsersRepository from '@modules/user/repositories/IUserRepository';
import IUserTokenRepository from '@modules/user/repositories/IUserTokenRepository';
import { container } from 'tsyringe';

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

container.registerSingleton<ITouristRepository>(
  'TouristRepository',
  TouristRepository,
);
