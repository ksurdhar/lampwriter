Lampwriter::Application.routes.draw do
  devise_for :users
  root to: "site#root"

  resources :users, only: [:index, :show], :defaults => { :format => :json }
  resources :notes, :defaults => {:format => :json}
end
