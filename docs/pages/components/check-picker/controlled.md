### 受控

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      value: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      value
    });
  }
  render() {
    return (
      <CheckPicker
        value={this.state.value}
        onChange={this.handleChange}
        data={data}
        style={{ width: 224 }}
      />
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
