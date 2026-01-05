package user

type Service struct {
	repo UserRepository
}

func NewService(repo UserRepository) *Service {
	return &Service{repo: repo}
}

func (s *Service) CreateUser(user *UserModel) (*UserModel, error) {
	return s.repo.CreateUser(user)
}

func (s *Service) GetUser(id string) (*UserModel, error) {
	return s.repo.GetUser(id)
}

func (s *Service) UpdateUser(id string, updateData *UserUpdateInput) (*UserModel, error) {
	return s.repo.UpdateUser(id, updateData)
}

func (s *Service) DeleteUser(id string) error {
	return s.repo.DeleteUser(id)
}
