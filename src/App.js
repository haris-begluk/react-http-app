import React, { Component } from "react";
import axios from "axios";
import "./App.css";
const apiEndpoint = "http://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    //pending >resolve (success) OR rejected (failure)
    // const promise = axios.get("http://jsonplaceholder.typicode.com/posts");
    // // console.log(promise);
    // const response = await promise;
    // console.log(response);
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }
  handleAdd = async () => {
    const obj = { title: "title a", body: "body a" };
    const { data: post } = await axios.post(apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    //const { data } = await axios.put(apiEndpoint + "/" + post.id, post);
    await axios.put(apiEndpoint + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
    // console.log(data);
    //We use patch when we need to update specific propery
    //axios.patch(apiEndpoint + "/" + post.id, { title: post.title });
  };

  handleDelete = async post => {
    //optimistic vs pessimistic
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      await axios.delete(apiEndpoint + "/" + post.id);
      //throw new Error(""); //just for testing
    } catch (ex) {
      //Expected (404: not found, 400: bad request)-Client errors
      //Display a specific error message
      //Unexpected errors: (network down, server down, database down, bug in code )
      //-log them
      //-Display a generic and friendly error message
      // ex.request
      //ex.response
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted!");
      else {
        console.log("Logging the error", ex);
        alert("An unexpected error occured!");
      }

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
