class SubscriptionsController < ApplicationController
  before_action :get_subscription, only: [:show,:new,:edit,:destroy]
  def index
    @subscription  = Subscription.all 
    render :json => @subscription, include: :movies
  end
  def show
  end
  def new
  end
  def create
    Subscription.create(subscription_params)
  end
  private 
  def get_subscription
    @subscription = Subscription.find(params[:id])
  end
  def subscription_params
    params.require(:subscription).permit(:name)
  end
end
