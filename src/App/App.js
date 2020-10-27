import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = {
    buttonStatus: 'button',
    name: '添加学员',
    id:1,
    data: [
      {
        id: 1,
        name: '添加学员',
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
        this.setState({id:id+1});
      } else if (id > 1) {
        this.setState({
          data: this.state.data.concat([
            {
              id: this.state.id,
              name: this.state.name,
            },
          ]),
        });
        this.setState({id:id+1});
      }
    }
  };

  render() {
    return (
      <div data-testid="app" className="App">

      

        <div>
          学员列表
          {this.state.data.map((item, i) => (
            <div key={i}>
              {item.id}
              <br />
              {item.name}
            </div>
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
