Rails.application.routes.draw do
  namespace :api do
    resources :categories
  end
  namespace :api do
    resources :tags, only: [:show, :create, :update, :destroy]
  end
  namespace :api do
    resources :tasks do
      resources :tags, controller: :task_tags, only: [:destroy] do
        member do
          post '/' => 'task_tags#create'
        end
      end
    end
  end
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
