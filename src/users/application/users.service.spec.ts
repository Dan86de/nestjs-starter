import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { createMock } from '@golevelup/ts-jest';
import { UsersRepository } from './ports/users.repository';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { User } from '../domain/user';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: DeepMockProxy<UsersRepository>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockDeep<UsersRepository>(),
        },
      ],
    })
      .useMocker(createMock)
      .compile();
    usersService = module.get(UsersService);
    usersRepository = module.get(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe(`CRUD`, () => {
    it(`should find all users`, async () => {
      // Arrange
      usersRepository.findAll.mockResolvedValueOnce([]);
      // Act
      const data = await usersService.findAll();
      // Assert
      expect(data).toEqual([]);
    });

    it(`should find one user`, async () => {
      // Arrange
      const testUser = new User(
        'test_ID',
        'test_email',
        'test_password',
        'test_role',
      );
      usersRepository.findOne.mockResolvedValueOnce(testUser);
      // Act
      const data = await usersService.findOne(testUser.id);
      // Assert
      expect(data).toEqual(testUser);
    });
  });
});
