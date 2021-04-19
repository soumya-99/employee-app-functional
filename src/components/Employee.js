import { useEffect, useState } from "react"
import axios from "axios"

const API_ENDPOINT = "http://127.0.0.1:8000/"

function Employee() {
	const [employees, setEmployees] = useState([])
	// const [addModalShow, setAddModalShow] = useState(false)
	// const [editModalShow, setEditModalShow] = useState(false)

	const refreshList = async () => {
		const { data: employees } = await axios.get(`${API_ENDPOINT}employee`)
		setEmployees(employees)
	}

	useEffect(() => {
		refreshList()
	}, [])

	return (
		<div>
			<h1>Department</h1>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th>Employee ID</th>
						<th>Employee Name</th>
						<th>Department</th>
						<th>Date of Joining</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee) => (
						<tr key={employee.EmployeeID}>
							<td>{employee.EmployeeID}</td>
							<td>{employee.EmployeeName}</td>
							<td>{employee.Department}</td>
							<td>{employee.DateOfJoining}</td>
							<td>Options</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Employee
