import { Link } from 'react-router-dom';
import { useGetApartmentsQuery } from '../apis/apartmentApi';
import { useGetRulesQuery } from '../apis/ruleApi';
import houseImg from '../images/live-house.svg';
import ruleImg from '../images/rule.png';

function HousePage(){

    const rulesResponse = useGetRulesQuery();
    const apartmentsResponse = useGetApartmentsQuery();

    return (
      <div className="house-page bg-blue-400">
        <div className="container mx-auto min-h-screen pt-24">
          <div className="grid grid-cols-2 items-center mb-10">
            <img src={houseImg} alt="my house" />
            <div className="col-span-1">
              <div className="grid grid-cols-3 gap-5 bg-violet-800 px-10 py-5 rounded-lg">
                <p className="col-span-3 mb-5 text-white text-5xl font-bold">
                  My house rules
                </p>
                {!rulesResponse.isLoading &&
                  !rulesResponse.error &&
                  rulesResponse.data.map((record, number) => (
                    <div
                      className="bg-white drop-shadow-xl rounded-lg px-3 py-2"
                      key={record.id}
                    >
                      <div className="flex gap-x-2 items-center mb-3">
                        <img
                          className="w-1/5"
                          src={ruleImg}
                          alt={`rule ${number}`}
                        />
                        <p className="text-black font-bold text-xl m-0">
                          Rule № {number + 1} :
                        </p>
                      </div>
                      <p className="m-0 text-black text-lg italic">
                        {record.text}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="bg-indigo-900 p-5 rounded-lg grid grid-cols-2 gap-5">
            <p className="col-span-2 mb-5 text-white text-5xl font-bold">
              House apartments
            </p>
            {!apartmentsResponse.isLoading &&
              !apartmentsResponse.error &&
              apartmentsResponse.data.map((record) => (
                <div
                  className="bg-indigo-500 px-5 py-5 rounded-lg"
                  key={record.id}
                >
                  <p className="m-0 text-white text-2xl font-bold">
                    Apartment number: {record.apartmentNumber}
                    <Link className="ml-5 hover:text-red-200 bg-green-500 px-3 py-2 text-white rounded-lg" to={`/apartments/${record.id}`}>Watch reports</Link>
                  </p>
                  {record.users.length !== 0 && (
                    <div className="my-5 grid grid-cols-1 gap-y-5 bg-indigo-600 px-5 py-2 rounded-lg">
                      <p className="mb-2 text-white text-lg font-bold">
                        Residents
                      </p>
                      {record.users.map((user, userNumber) => (
                        <div className="bg-gray-300 p-1 rounded">
                            <p className="font-bold text-black mb-2">№ {userNumber + 1}</p>
                            <p className="m-0 text-black">Fullname: {user.fullName}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
}

export default HousePage;