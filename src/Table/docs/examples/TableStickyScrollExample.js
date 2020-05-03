/* eslint-disable */

class TableStickyScrollExample extends React.Component {
  rowCount = 4;
  columnCount = 20;

  range = (max) => Array.from(Array(max).keys()).map(i => i + 1);

  data = this.range(this.rowCount).map(rowIndex =>
    this.range(this.columnCount).reduce(
      (rows, columnIndex) => ({
        ...rows,
        [`value${columnIndex}`]: `Value ${columnIndex}-${rowIndex}`,
      }),
      {},
    )
  );

  render() {

    const columnsArr = this.range(this.columnCount).map(columnIndex => ({
      title: `Column ${columnIndex}`,
      render: row => row[`value${columnIndex}`],
      width: 150,
    }))
      .concat({
        title: '',
        width: 100,
        stickyActionCell: true,
        render: () => (
          <TableActionCell primaryAction={{ text: 'Edit' }} />
        )});

    return (
      <Table
        horizontalScroll
        stickyColumns={2}
        showSelection
        data={this.data}
        columns={columnsArr}
      >
        <Table.Content />
      </Table>
    );
  }
}
