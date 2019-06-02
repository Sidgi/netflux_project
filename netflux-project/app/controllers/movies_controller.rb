class MoviesController < ApplicationController
  before_action :get_movies, only: [:show,:new,:edit,:destroy]
  def index
    @movies  = Movie.all 
    render :json => @movies
  end
  def show
  end
  def new
  end
  def create
    Customer.create(movie_params)
  end
  private 
  def get_movies
    @movie = Movie.find(params[:id])
  end
  def movie_params
    params.require(:movie).permit(:title,:year,:genre, :director, :plot, :image)
  end
end
