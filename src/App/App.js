import React, { Component } from 'react';
import './App.scss';

// TODO GTB-1: * 没有样式，添加，分组等实现逻辑与需求不符，只有分组是有api请求的，刷新就会回到初始状态
// TODO GTB-1: * 实现添加学员，学员列表功能，分组列表有但没有看出是分组，只是全部随机排序了
// TODO GTB-2: * 没有测试
// TODO GTB-3: * 没有做组件拆分，只有一个App组件，思考如何拆分与复用组件
// TODO GTB-3: * 没有使用语义化标签
// TODO GTB-3: * 没有写样式
// TODO GTB-3: * 运用了ES6+语法及fetch
// TODO GTB-3: * 运用React相关知识点，但未拆分组件，一些知识点无法验证
// TODO GTB-3: * 总体来说完成度低，很多知识点无法验证
// TODO GTB-4: * 有小步提交意识，但提交可以更小步，如拆分组件后以组件粒度等
// TODO GTB-4: * 没有抽出Api请求层
// TODO GTB-4: * 没有做组件拆分，App组件过长
// TODO GTB-4: * 数据设计有点问题
// TODO GTB-4: * 总体来说完成度低，很多工程实践无法验证
// TODO GTB-4: * eslint存在较多error，需要fix
class App extends Component {
  state = {
    buttonStatus: 'button',
    // TODO GTB-4: - id与name都是冗余的state，可以不用双向绑定所以不用name，id则应该是后端生成的
    name: '添加学员',
    id: 1,
    // TODO GTB-4: - id应该是后端生成，且学员为空不应该有id
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

  // TODO GTB-4: - 方法命名小写开头
  AddStudent = () => {
    this.setState({ buttonStatus: 'text', name: '' });
  };

  // TODO GTB-4: - 同name，这里是冗余方法
  onChange = (field, e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  // TODO GTB-4: - 这里e里可以拿到value，所以name是冗余state
  onKeyPress = (e) => {
    if (e.which == 13) {
      const { id } = this.state;
      // TODO GTB-3: - 这里应该做添加学员请求
      // TODO GTB-4: - 这里id是否为1，把整个代码可读性搞得很差，没必要设置id为1的空列标示
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
    // TODO GTB-4: - 可以抽出api请求层，解耦请求与渲染
    const URL = 'http://localhost:8080/students/grouping';
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(this.state.data),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        console.log(result);
        this.setState({ return_data: result });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      // TODO GTB-3: - 加强语义化标签的使用
      <div data-testid="app" className="App">
        <div>
          分组列表
          <button onClick={this.Grouping}>学员分组</button>
          {this.state.return_data.map((item, i) => (
            // TODO GTB-4: - 不推荐使用index为key
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
            // TODO GTB-4: - 没必要双向绑定，onChange也是冗余的
            onChange={(e) => this.onChange('name', e)}
            onKeyPress={(e) => this.onKeyPress(e)}
          />
        </div>
      </div>
    );
  }
}

export default App;
