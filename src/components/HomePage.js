import houseImg from '../images/house.svg';

function HomePage(){
    return(
        <div className="home-page bg-blue-400">
            <div className="container mx-auto grid grid-cols-2 min-h-screen items-center">
                <div className="cols-span-1 w-3/4">
                    <p className="text-white font-bold text-5xl mb-5">Department manager app</p>
                    <p className="text-white text-2xl font-light">
                        Manage and monitor your house and neighbours apartments. Rate, comment
                        and watch different apartments.
                    </p>
                </div>
                <img className="justify-self-center w-3/4" alt="house image" src={houseImg}/>
            </div>
        </div>
    );
}

export default HomePage;