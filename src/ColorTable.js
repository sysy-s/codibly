export default function ColorTable({ data }) {
  return (
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Year</th>
        </tr>
        {Array.isArray(data) ? (
          data.map((el) => (
            <tr style={{ background: el.color }} key={el.id}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.year}</td>
            </tr>
          ))
        ) : (
          <>
            <tr style={{ background: data.color }} key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.year}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}
