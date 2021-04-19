import { useEffect, useState } from "react"
import axios from "axios"

const API_ENDPOINT = "http://127.0.0.1:8000/"

function Department() {
	const [departments, setDepartments] = useState([])
	const [inputField, setInputField] = useState("")
	// const [addModalShow, setAddModalShow] = useState(false)
	// const [editModalShow, setEditModalShow] = useState(false)

	const refreshList = async () => {
		const { data: departments } = await axios.get(`${API_ENDPOINT}department`)
		setDepartments(departments)
	}

	useEffect(() => {
		refreshList()
	}, [])

	// Deleting Department
	const deleteDepartment = async (departmentId) => {
		const originalDepartments = [...departments]
		const newArrayOfDepatments = departments.filter(
			(dep) => dep.DepartmentID !== departmentId.DepartmentID
		)
		setDepartments(newArrayOfDepatments)
		try {
			await axios.delete(`${API_ENDPOINT}department/${departmentId.DepartmentID}`)
		} catch (error) {
			if (error.response && error.response.status === 404)
				alert("404 Not Found")
			setDepartments(originalDepartments)
		}
	}

	// Adding Departments
	const addDepartment = async (e) => {
		e.preventDefault()
		const obj = { "DepartmentName": inputField }
		const { data: department } = await axios.post(
			`${API_ENDPOINT}department`,
			obj
		)
		const newArrayOfDepartments = [department, ...departments]
		setDepartments(newArrayOfDepartments)
		setInputField("")
	}

	return (
		<div>
			<h1>Department</h1>
			<hr />
			<button
				type="button"
				className="btn btn-primary mb-2"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
			>
				+ Add Department
			</button>

			{/* Modal */}
			<div
				className="modal fade"
				id="exampleModal"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Adding Department
							</h5>
						</div>
						<div className="modal-body">
							<form onSubmit={addDepartment}>
								<input
									className="form-control"
									type="text"
									placeholder="Department Name"
									aria-label="default input example"
									value={inputField}
									onChange={(e) => setInputField(e.target.value)}
								/>
								<button
									type="submit"
									className="btn btn-success mt-5"
									disabled={!inputField}
								>
									Save Changes
								</button>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>

			<table className="table table-striped table-bordered table-hover">
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
								<button className="btn btn-warning mr-2">Edit</button>
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
