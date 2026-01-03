package user

type IRepository interface {
	Create(user *UserModel) (*UserModel, error)
	GetAll() (*[]UserModel, error)
	GetByID(id string) (*UserModel, error)
	Update(id string, updates *UserUpdate) (*UserModel, error)
	Delete(id string) error
}

type Service struct {
	repo IRepository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) CreateUser(user *UserModel) (*UserModel, error) {
	return s.repo.Create(user)
}

func (s *Service) GetAllUsers() (*[]UserModel, error) {
	return s.repo.GetAll()
}

func (s *Service) GetUserByID(id string) (*UserModel, error) {
	return s.repo.GetByID(id)
}

func (s *Service) UpdateUser(id string, updates *UserUpdate) (*UserModel, error) {
	return s.repo.Update(id, updates)
}

func (s *Service) DeleteUser(id string) error {
	return s.repo.Delete(id)
}
