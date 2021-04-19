import { useEffect, useState } from "react"
import axios from "axios"

const API_ENDPOINT = "http://127.0.0.1:8000/"

function Department() {
	const [departments, setDepartments] = useState([])
	// const [addModalShow, setAddModalShow] = useState(false)
	// const [editModalShow, setEditModalShow] = useState(false)

	const refreshList = async () => {
		const { data: departments } = await axios.get(`${API_ENDPOINT}department`)
		setDepartments(departments)
	}

	useEffect(() => {
		refreshList()
	}, [])

	const deleteDepartment = (departmentId) => {
		const originalDepartments = [...departments]
		const newArrayOfDepatments = departments.filter(
			(dep) => dep.DepartmentID !== departmentId.DepartmentID
		)
		setDepartments(newArrayOfDepatments)
		try {
			axios.delete(`${API_ENDPOINT}department/${departmentId.DepartmentID}`)
		} catch (error) {
			if (error.response && error.response.status === 404)
				alert("404 Not Found")
			setDepartments(originalDepartments)
		}
	}

	return (
		<div>
			<h1>Department</h1>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th>Department ID</th>
						<th>Department Name</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{departments.map((department) => (
						<tr key={department.DepartmentID}>
							<td>{department.DepartmentID}</td>
							<td>{department.DepartmentName}</td>
							<td>
								<button className="btn btn-primary mr-2">Edit</button>
								<button
									className="btn btn-danger"
									onClick={() => deleteDepartment(department)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Department
