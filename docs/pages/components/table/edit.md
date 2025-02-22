<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

export const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === 'EDIT';
  return (
    <Cell {...props} className={editing ? 'table-content-editing' : ''}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={event => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: '6px 0' }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick && onClick(rowData.id);
        }}
      >
        {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
      </Button>
    </Cell>
  );
};

class EditTable extends React.Component {
  constructor(props) {
    super(props);
    const data = fakeData.filter((v, i) => i < 8);
    this.state = {
      data
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditState = this.handleEditState.bind(this);
  }
  handleChange(id, key, value) {
    const { data } = this.state;
    const nextData = Object.assign({}, data);
    nextData.find(item => item.id === id)[key] = value;
    this.setState({
      data: nextData
    });
  }
  handleEditState(id) {
    const { data } = this.state;
    const nextData = Object.assign({}, data);
    const activeItem = nextData.find(item => item.id === id);
    activeItem.status = activeItem.status ? null : 'EDIT';

    this.setState({
      data: nextData
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <Table height={420} data={data}>
          <Column width={200}>
            <HeaderCell>First Name</HeaderCell>
            <EditCell dataKey="firstName" onChange={this.handleChange} />
          </Column>

          <Column width={200}>
            <HeaderCell>Last Name</HeaderCell>
            <EditCell dataKey="lastName" onChange={this.handleChange} />
          </Column>

          <Column width={300}>
            <HeaderCell>Email</HeaderCell>
            <EditCell dataKey="email" onChange={this.handleChange} />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Action</HeaderCell>
            <ActionCell dataKey="id" onClick={this.handleEditState} />
          </Column>
        </Table>
      </div>
    );
  }
}

ReactDOM.render(<EditTable />);
```

<!--end-code-->

> 可编辑的表格，只需要自定义一个 `Cell` 就行了

```js
export const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
  return (
    <Cell {...props}>
      {rowData.status === 'EDIT' ? (
        <input
          className="input"
          defaultValue={rowData[dataKey]}
          onChange={event => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
        rowData[dataKey]
      )}
    </Cell>
  );
};
```
