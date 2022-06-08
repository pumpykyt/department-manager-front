import { Table, Modal } from "antd";
import { useState } from "react";
import { useAddUserToAppartmentMutation, useDeleteUserFromApartmentMutation, useGetApartmentsQuery, usePostApartmentMutation } from "../apis/apartmentApi";
import { useGetUsersQuery } from "../apis/authApi";
import { Select } from 'antd';
import { toast } from "react-toastify";

const { Option } = Select;

function ApartmentPanel(){
    
    const [addUserModal, setAddUserModal] = useState(false);
    const [addUserModel, setAddUserModel] = useState(false);

    const [addApartmentModal, setAddApartmentModal] = useState(false);
    const [addApartmentModel, setAddApartmentModel] = useState(false);

    const apartmentResponse = useGetApartmentsQuery();
    const [addUserToAppartment] = useAddUserToAppartmentMutation();
    const [addApartment] = usePostApartmentMutation();
    const [deleteUserFromApartment] = useDeleteUserFromApartmentMutation();
    const usersResponse = useGetUsersQuery();

    const apartmentColumns = [
        {
            title: 'Apartment ID',
            dataIndex: 'id',
            key: 'apartmentId'
        },
        {
            title: 'Apartment number',
            dataIndex: 'apartmentNumber',
            key: 'apartmentNumber'
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <div className="flex gap-x-10">
                    <button onClick={() => handleShowAddUserToApartmentModal(record.id)} className="bg-green-500 text-white px-3 py-2 rounded-lg">Add user to apartment</button>
                </div>
            )
        }
    ];

    const userColumns = [
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'userId'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'userEmail'
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'userFullName'
        },
        {
            title: 'Actions',
            render: (_, record) => (
              <div className="flex">
                <button onClick={() => handleRemoveUserFromApartment(record.id)} className="bg-red-500 px-3 py-2 text-white rounded-lg">Remove</button>
              </div>
            )
        }
    ];

    const handleRemoveUserFromApartment = userId => {
        deleteUserFromApartment(userId).unwrap().then(result => {
          toast.success('Successfully removed user from apartment');
        }).catch(error => {
          toast.error('Server error');
        });
    }

    const handleShowAddUserToApartmentModal = apartmentId => {
        setAddUserModel({userId: usersResponse.data[0].id, apartmentId});
        setAddUserModal(true);
    }

    const handleUserSelectChange = value => {
        setAddUserModel({...addUserModel, userId: value});
    }

    const handleAddUserSubmit = () => {
        addUserToAppartment(addUserModel).then(result => {
            toast.success('Successfully added user to apartment');
        }).catch(error => {
            toast.error('Server error');
        });
    }

    const handleAddApartment = () => {
        addApartment(addApartmentModel).then(result => {
            toast.success('Successfully added apartment');
            setAddApartmentModal(false);
        }).catch(error => {
            toast.error('Server error');
        });
    }

    return (
      <div className="house-panel min-h-screen bg-blue-400 pt-36">
        <Modal
          title="Add apartment"
          visible={addApartmentModal}
          footer={null}
          onCancel={() => setAddApartmentModal(false)}
        >
          <input className="block focus:outline-none text-lg p-1 w-100 bg-gray-200 mb-5" placeholder="Apartment number" type="text" value={addApartmentModel.number} onChange={e => setAddApartmentModel({...addApartmentModel, apartmentNumber: e.target.value})}/>
          <button
            onClick={handleAddApartment}
            className="bg-green-500 w-full py-2 rounded-lg mt-5 text-white"
          >
            Submit
          </button>
        </Modal>
        <Modal
          title="Add user to apartment"
          visible={addUserModal}
          footer={null}
          onCancel={() => setAddUserModal(false)}
        >
          {!usersResponse.isLoading && !usersResponse.error && (
            <Select
              onChange={handleUserSelectChange}
              defaultValue={usersResponse.data[0].id}
            >
              {usersResponse.data.map((record) => (
                <Option key={record.id} value={record.id}>
                  {record.email}
                </Option>
              ))}
            </Select>
          )}
          <button
            onClick={handleAddUserSubmit}
            className="bg-green-500 w-full py-2 rounded-lg mt-5 text-white"
          >
            Submit
          </button>
        </Modal>
        <div className="container mx-auto">
          <p className="text-white mb-5 font-bold text-3xl">Apartment panel</p>
          <div className="flex mb-5">
            <button
              onClick={() => {
                setAddApartmentModal(true);
              }}
              className="bg-yellow-500 py-2 px-3 rounded-lg mt-5 text-white"
            >
              Add apartment
            </button>
          </div>
          <Table
            expandable={{
              rowExpandable: (record) => record.users.length !== 0,
              expandedRowRender: (record) => (
                <div className="px-10">
                  <Table
                    pagination={false}
                    columns={userColumns}
                    dataSource={record.users}
                  />
                </div>
              ),
            }}
            dataSource={apartmentResponse.data}
            columns={apartmentColumns}
          />
        </div>
      </div>
    );
}

export default ApartmentPanel;