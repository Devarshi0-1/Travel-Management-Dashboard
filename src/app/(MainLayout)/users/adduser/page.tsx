import AddUserForm from '@/components/Users/AddUserForm';

const AddUser = () => {
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-12'>
					<div className='row'>
						<div className='col-sm-12'>
							<div className='card'>
								<div className='card-header'>
									<h5>Add New User</h5>
								</div>
								<div className='card-body'>
									<AddUserForm />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddUser;
