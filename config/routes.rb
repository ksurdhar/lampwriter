Lampwriter::Application.routes.draw do
  devise_for :users
  root to: "site#root"
end
