import React from 'react';
import './App.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3004';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      user:null,
      movies:null,
      subscriptions:null,
      name:'',
      email:'',
      password:'',
      subscription_id: null,
      users:[],
      operation:null
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCreateUser = this.handleCreateUser.bind(this)
  }
  async componentDidMount(){
    const data = await axios.get('/subscriptions');
    const allUsers = await axios.get('/customers');
    this.setState({subscriptions:data.data,users:allUsers.data})
  }
  handleOnChange(e){
    e.preventDefault();
    const {name,value} = e.target;
    this.setState({[name]:value});
  }
  async handleCreateUser(e){
    e.preventDefault();
    const data = {
      "name":this.state.name,
      "email":this.state.email,
      "password":this.state.password,
      "subscription_id":this.state.subscription_id
    }
    const newCustomer = {"customer":data};
    if(this.state.operation==='Create'){
      const returnedUser = await axios.post('/customers',newCustomer);
      this.setState({user:returnedUser.data})
    }else{
      const formData = new FormData(e.target);
      const id =   formData.get("id");
      const editedUser = await axios.put(`/customers/${id}`,newCustomer);
    }
    
  }
  handleChangeSub(e){
    console.log(e.target.value)
    e.preventDefault();
    this.state.subscriptions&&this.state.subscriptions.map(subscription=>{
      if (subscription.name === e.target.value){
        this.setState({subscription_id:subscription.id})
      }
      }) 
  }
  handleOperation(e){
    e.preventDefault();
    const {value} = e.target;
    this.setState({operation:value});
  }
  async deleteUser(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const id =   formData.get("id");
    await axios.delete(`/customers/${id}`);
  }
  render(){
    const {subscriptions,user,users} = this.state;
    return (
      <div className="App">
        <h1>Movies App</h1>
       {this.state.user?null:<form onSubmit={this.handleCreateUser} >
          <label>Name:</label>
          <input onChange={this.handleOnChange} type='text' name='name'/>
          <label>Email:</label>
          <input onChange={this.handleOnChange} type='text' name='email'/>
          <label>Password:</label>
          <input onChange={this.handleOnChange} type='text' name='password'/>
          <select onChange={(e)=>this.handleChangeSub(e)}>
            {subscriptions&&subscriptions.map(subscription=><option  key={subscription.id}>{subscription.name}</option>)}
          </select>
          <select name='id' onChange={(e)=>this.handleChangeSub(e)}>
            {users&&users.map(user=><option  key={user.id}>{user.id}</option>)}
          </select>
          <select  onChange={(e)=>this.handleOperation(e)}>
           <option>Edit</option>
           <option>Create</option>
          </select>
          <input type='submit' value='submit'/>
          <button onClick={this.deleteUser}>Delete</button>
        </form>}
        {user?<section>{subscriptions.map(subscription=>{return <h1>{subscription.id === user.subscription_id?subscription.movies.map(movie=>{return(
        <div>
          <h1>Title: {movie.title}</h1>
          <h5>Director: {movie.director}</h5>
          <h5>Genre: {movie.genre}</h5>
          <img src={movie.image}/>
        </div>
        )}):null}</h1>})}</section>:<h1>Please Login</h1>}
      </div>
    );
  }
}

export default App;
