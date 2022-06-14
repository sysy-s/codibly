import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";

export default function ColorTable({ data }) {
  return (
    <TableContainer>
      <Table style={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) ? (
            data.map((el) => (
              <TableRow style={{ background: el.color }} key={el.id}>
                <TableCell>{el.id}</TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.year}</TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <TableRow style={{ background: data.color }} key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.year}</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
