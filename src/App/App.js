import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = {
    buttonStatus: 'button',
    name: '添加学员',
    id: 1,
    data: [
      {
        id: 1,
        name: '学员为空',
      },
    ],

    return_data: [
      {
        id: 1,
        name: '学员为空',
      },
    ],

  };

  AddStudent = () => {
    this.setState({ buttonStatus: 'text', name: '' });
  };

  onChange = (field, e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  onKeyPress = (e) => {
    if (e.which == 13) {
      let id = this.state.id;
      if (id == 1) {
        this.setState({
          data: [
            {
              id: this.state.id,
              name: this.state.name,
            },
          ],
        });
      } else if (id > 1) {
        this.setState({
          data: this.state.data.concat([
            {
              id: this.state.id,
              name: this.state.name,
            },
          ]),
        });
      }
      this.setState({ id: id + 1 });
    }
  };

  Grouping = () => {
    const URL = 'http://localhost:8080/students/grouping';
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(this.state.data),
      headers: {
        'content-type': 'application/json'
    }
    })
      .then((result) => {
        return result.json(); 
      })
      .then((result)=>{
        console.log(result);
        this.setState({return_data:result})
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div data-testid="app" className="App">
        <div>
          分组列表
          <button onClick={this.Grouping}>学员分组</button>
          {this.state.return_data.map((item, i) => (
            <li key={i}>
              {item.id}：{item.name}
            </li>
          ))}
        </div>

        <div>
          学员列表
          {this.state.data.map((item, i) => (
            <li key={i}>
              {item.id}：{item.name}
            </li>
          ))}
          <input
            type={this.state.buttonStatus}
            value={this.state.name}
            onClick={this.AddStudent}
            id="name"
            onChange={(e) => this.onChange('name', e)}
            onKeyPress={(e) => this.onKeyPress(e)}
          ></input>
        </div>
      </div>
    );
  }
}

export default App;
