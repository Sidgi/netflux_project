class CustomersController < ApplicationController
  before_action :get_customer, only: [:show,:new,:edit,:destroy,:update]
  def index
    @customers  = Customer.all 
    render :json => @customers, include: :subscription
  end
  def show
  end
  def new
  end
  def create
    @newCustomer = Customer.new(customer_params)
    if @newCustomer.save
          render json: @newCustomer, status: :created
    else
      render json: { errors: @newCustomer.errors.full_messages },
              status: :unprocessable_entity
    end
  end
  def edit
  end
  def update
     @customer.update(customer_params)
  end
  def destroy
    @customer.destroy
 end
  private 
  def get_customer
    @customer = Customer.find(params[:id])
  end
  def customer_params
    params.require(:customer).permit(:name,:email,:password,:subscription_id)
  end

end
