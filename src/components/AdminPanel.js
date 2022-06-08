import { Link } from "react-router-dom";

function AdminPanel(){
    return(
        <div className="admin-panel bg-blue-400">
            <div className="container mx-auto min-h-screen pt-36 items-center text-center">
                <Link to='/admin/apartments/panel' className="w-1/3 block bg-amber-600 text-white px-5 py-2 rounded-lg text-xl mx-auto mb-5">Apartment panel</Link>
                <Link to='/admin/rules/panel' className="w-1/3 block bg-indigo-600 text-white px-5 py-2 rounded-lg text-xl mx-auto">Rule panel</Link>
            </div>
        </div>
    );
}

export default AdminPanel;