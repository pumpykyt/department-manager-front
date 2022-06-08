import { Input } from "antd";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetApartmentQuery } from "../apis/apartmentApi";
import { useGetReportsQuery, usePostReportMutation } from "../apis/reportApi";
import apartmentImg from '../images/apartment.svg';
import userImg from '../images/user.png';

const { TextArea } = Input;

function ApartmentPage(){

    const params = useParams();
    const apartmentResponse = useGetApartmentQuery(params.id);
    const reportsResponse = useGetReportsQuery(params.id);
    const [postReport] = usePostReportMutation();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [reportModel, setReportModel] = useState({text: '', userId: '', apartmentId: ''});

    const handlePostReport = () => {
        if(reportModel.text === ''){
            toast.error('Comment text should not be empty');
            return;
        }
        
        postReport({
            ...reportModel,
            userId: jwtDecode(localStorage.getItem('token')).id,
            apartmentId: params.id
        }).unwrap().then(result => {
            toast.success('Comment sent successfully');
        }).catch(error => {
            toast.error('Server error');
        });
    }

    return(
        <div className="apartment-page min-h-screen bg-blue-400">
            {
                !apartmentResponse.isLoading && !apartmentResponse.error &&
                <div className="pt-36 container mx-auto grid grid-cols-2 gap-x-20">
                    <img src={apartmentImg} alt="apartment image"/>
                    <div className="p-5 rounded-lg bg-indigo-600 grid grid-cols-1 items-center py-12">
                        <p className="font-bold text-3xl text-white">Apartment number: {apartmentResponse.data.apartmentNumber}</p>
                        <p className="font-bold text-xl text-white">Residents: {apartmentResponse.data.users.length}</p>
                        <div className="items-center">
                            {
                                apartmentResponse.data.users.map((user, userNumber) => (
                                    <div key={user.id} className="mb-5 block rounded-lg p-2 bg-indigo-400">
                                        <p className="mb-0 text-white font-bold">Full name: {user.fullName}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-span-2 bg-violet-500 mt-10 p-5 rounded-lg">
                        <p className="font-bold text-2xl text-white mb-5">Comments: </p>
                        {
                            !reportsResponse.isLoading && !reportsResponse.error &&
                            <div className="grid grid-cols-1 gap-y-5 mb-5">
                                {
                                    reportsResponse.data.map((report) => (
                                        <div className="bg-indigo-400 rounded-lg p-3 grid grid-cols-12 gap-x-5" key={report.id}>
                                            <img className="w-20 col-span-1" src={userImg}/>
                                            <div className="col-span-11 items-center">
                                                <p className="mb-2 text-white font-bold text-xl">{report.userName}</p>
                                                <p className="m-0 text-white text-lg italic">{report.text}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                        {
                            isAuthenticated &&
                            <div className="mt-10">
                                <p className="mb-2 text-white font-bold text-xl">Write comment about apartment and it`s residents:</p>
                                <TextArea onChange={e => setReportModel({...reportModel, text: e.target.value})} rows={4} />
                                <button onClick={handlePostReport} className="mt-2 bg-green-500 px-3 py-2 text-white rounded-lg">Send</button>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default ApartmentPage;