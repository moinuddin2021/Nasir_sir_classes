import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Facultyreciept, Update_faculty_reciept, usegetAdmin } from "../hooks/usePost"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from './Loader';
import { Tooltip } from "@material-tailwind/react";
import { NasirContext } from "../NasirContext";
import { IoIosArrowBack } from "react-icons/io";


export default function Salarydetails() {
    const { admin } = React.useContext(NasirContext);
    const Toaster = () => { toast.success('Receipt updated successfully') }
    const errtoast = () => { toast.error("Invalid UserID / Password") }
    const params = useParams();
    const [isloading, setloading] = React.useState(true)
    const [faculty, setfaculty] = React.useState();
    const [salary, setsalary] = React.useState();
    const [is_hourly, setishourly] = React.useState();
    const [salary_amount, setsalaryamount] = React.useState();
    const [cash, setcash] = React.useState(false);
    const [upi, setupi] = React.useState(false);
    const [chaque, setchaque] = React.useState(false);
    const [chaque_no, setchaqueno] = React.useState('');
    const [chequeDate, setChequeDate] = React.useState('');
    const [upi_no, setupino] = React.useState('');
    const [payment, setPayment] = React.useState("");
    const [amount, setamount] = React.useState(false);
    const [upierror, setupierror] = React.useState(false);
    const [chaqueerror, setchaqueerror] = React.useState(false);
    const [chequeDateError, setChequeDateError] = React.useState(false);
    const [amounterror, setamounterror] = React.useState(false);
    const [toggle, setToggle] = React.useState(false);
    const [model, setModel] = React.useState(false);
    const [pin, setPin] = React.useState("");
    const [error, setError] = React.useState(false);
    const [hourRateError, setHourRateError] = React.useState(false);
    const [salaryData, setSalaryData] = React.useState({
        hour: "",
        amount: "",
    });
    const [hourRateEmptyError, setHourRateEmptyError] = React.useState(false);
    const [isLoadingOnSubmit, setIsLoadingOnSubmit] = React.useState(false);


    // --------------------------------
    // --------  API WORK -------------
    // -------------------------------

    React.useEffect(() => {
        async function fetchfacultdata() {
            const res = await Facultyreciept(params.id);

            let cheque_date = new Date(res.data.data.receipt_details.getdetails.transaction_id.cheque_date);
            cheque_date = `${cheque_date.getFullYear()}-${cheque_date.getMonth() + 1 < 10 ? "0" + (cheque_date.getMonth() + 1) : cheque_date.getMonth() + 1}-${cheque_date.getDate() < 10 ? "0" + cheque_date.getDate() : cheque_date.getDate()}`

            const is_by_upi = res.data.data.receipt_details.getdetails.transaction_id.is_by_upi;
            const is_by_cash = res.data.data.receipt_details.getdetails.transaction_id.is_by_cash;
            const is_by_cheque = res.data.data.receipt_details.getdetails.transaction_id.is_by_cheque;

            setfaculty(() => res.data.data.receipt_details.getdetails)
            setsalary(() => res.data.data.receipt_details.hourlysalary)
            setishourly(() => res.data.data.receipt_details.getdetails.is_hourly)
            setsalaryamount(() => res.data.data.receipt_details.getdetails.transaction_id.amount)
            setcash(() => is_by_cash)
            setupi(() => is_by_upi)
            setchaque(() => is_by_cheque)
            setchaqueno(() => res.data.data.receipt_details.getdetails.transaction_id.cheque_no)
            setChequeDate(()=> cheque_date)
            setupino(() => res.data.data.receipt_details.getdetails.transaction_id.upi_no)
            setSalaryData({
                amount: res.data.data.receipt_details.hourlysalary?.rate_per_hour ? res.data.data.receipt_details.hourlysalary.rate_per_hour : "",
                hour: res.data.data.receipt_details.hourlysalary?.rate_per_hour ? res.data.data.receipt_details.hourlysalary.total_hours : "",
            })
            setPayment(
                is_by_upi
                    ?
                    '2'
                    :
                    is_by_cheque
                        ?
                        "3"
                        :
                        "1"
            )
            if(res.data.data.receipt_details.getdetails.is_hourly == 1){
                setToggle(true)
            }
            setloading(false)
        }
        fetchfacultdata()
    }, [])


    var receiptDate = new Date(faculty?.date);
    var date =
        receiptDate.getDate() +
        " / " +
        (receiptDate.getMonth() + 1) +
        " / " +
        receiptDate.getFullYear();

    // ------------------------
    // ----- Payment_type ------
    // ------------------------
    function handleCash(e) {
        setchaqueerror(false)
        setChequeDateError(false);
        setupierror(false)
        setPayment(e.target.value)
        setcash(true)
        setupi(false)
        setchaque(false)
        setupino("")
        setchaqueno("")
        setChequeDate('');

    }
    function handleUpi(e) {
        setchaqueerror(false)
        setChequeDateError(false);
        setPayment(e.target.value);
        setcash(false)
        setupi(true)
        setchaque(false)
        setchaqueno("")
        setChequeDate('');
        setupino("")
    }
    function handleCheque(e) {
        setchaqueerror(false)
        setChequeDateError(false);
        setupierror(false)
        setPayment(e.target.value);
        setcash(false)
        setupi(false)
        setchaque(true)
        setupino("")
        setchaqueno("")
        setChequeDate('');
    }

    // ------------------------
    // ----- salary_type ------
    // ------------------------
    function handleFixed(e) {
        setishourly(e.target.value);
        setsalaryamount("");
        setamount(false)
        setToggle(false);
        setamounterror(false)
        setSalaryData({hour: '', amount: ''})
        setHourRateError(false)
        setHourRateEmptyError(false);
    }

    function handleLecture(e) {
        setsalaryamount("");
        setamount(true)
        setishourly(e.target.value);
        setToggle(true);
        setHourRateError(false)
        setHourRateEmptyError(false);
        setamounterror(false)
    }

    function isSameDay(selectedDate){
        const date = new Date(selectedDate);
        const currentDate = new Date();

        return date.getFullYear() === currentDate.getFullYear()
            && date.getDate() === currentDate.getDate()
            && date.getMonth() === currentDate.getMonth();

    }

    const handleChequeDate = (e) =>{
        if(e.target.value == ''){
            setChequeDateError(true);
        }
        else if(isSameDay(e.target.value)){
            setChequeDateError(false);
        }
        else if(new Date(e.target.value).getTime() < new Date().getTime()){
            setChequeDateError(true);
        }
        else{
            setChequeDateError(false);
        }
        setChequeDate(e.target.value)
    }

    // ------------------------------------
    // ----- Chaque_number Validation ------
    // ------------------------------------
    function genreciept() {
        let error = 0
        if (is_hourly == 0 && (amounterror || salary_amount == '')) {
            error++;
            setamounterror(true)
        }
        if(is_hourly == 1 && (salaryData.hour == '' || salaryData.amount == '')){
            setHourRateError(true)
            error++;
        }
        if (upi && upi_no == "") {
            return setupierror(true)
        }
        if (chaque && chaque_no == "") {
            error++;
            setchaqueerror(true)
        }
        if (chaque && chequeDate == "") {
            error++;
            setChequeDateError(true)
        }
        if (error > 0) {
            return;
        } else {
            setModel(true);
        }
    }

    // ------------------------
    // ----- Payment_PIN ------
    // ------------------------
    const navigate = useNavigate();
    async function handlePINsubmit() {
        const gen_reciept = ({
            salary_receipt_id: params.id,
            is_hourly: is_hourly,
            admin_id: admin._id,
            name: faculty.staff_id.basic_info_id.full_name,
            is_by_cheque: chaque ? 1 : 0,
            is_by_upi: upi ? 1 : 0,
            is_by_cash: cash ? 1 : 0,
            cheque_no: payment == 3 ? chaque_no : "-1",
            cheque_date: payment == 3 ? chequeDate : "",
            upi_no: payment == 2 ? upi_no : '-1',
            amount: salary_amount,
            total_amount: salary_amount,
            total_hours: salaryData.hour,
            rate_per_hour: salaryData.amount,

        });
        if (pin == admin.security_pin) {
            setIsLoadingOnSubmit(true)
            const res = await Update_faculty_reciept(gen_reciept)
            setIsLoadingOnSubmit(false)

            if (res?.data?.success == true) {
                const receipt_id = res.data.salary_receipt_details.salary_receipt_id
                navigate(`/salary/Receipt_teacher/${receipt_id}`, { state: { prevPath: "update_receipt" } })
                Toaster()
            } else {
                errtoast({
                    invalid_pin: res?.data?.message
                });
            }

        } else {
            setError(true);
        }
    }

    // ----------------------------------
    // ----- Lecturedbase_calculation ------
    // ------------------------------------
    function calculateSalary() {
        if(hourRateError){
            return;
        }
        if(salaryData.hour == '' || salaryData.amount == ''){
            setHourRateEmptyError(true);
            return;
        }
        setamounterror(false)
        setsalaryamount(salaryData.hour * salaryData.amount);
        setToggle(false);
    }

    if (isloading) {
        return <Loader />
    }

    return (
        <>
            <div className="w-full h-full bg-student-100">
                {model && (
                    <div className="flex justify-center mt-4  bg-white ">
                        <div className="absolute h-2/5 mx-auto  opacity-100 shadow-2xl rounded      bg-white w-2/3 z-50">
                            <div className="flex justify-end">
                                <button
                                    onClick={(e) => {setModel(!model); setError(false)}}
                                    className="absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700"
                                >
                                    <AiFillCloseCircle />
                                </button>
                            </div>

                            <div className="mt-7">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold text-darkblue-500 px-6 ">
                                        Confirm Payment{" "}
                                    </h1>

                                </div>
                                <div className="flex  justify-between px-7 py-3">
                                    <div>
                                        <h1 className="font-bold uppercase">Name : {faculty.staff_id.basic_info_id.full_name}</h1>
                                    </div>
                                    <div className="text-sm">
                                        <h4>Date : {date} </h4>
                                    </div>
                                </div>

                                <div className="flex px-12 py-5  space-x-4">
                                    <span className="px-4 py-1 bg-green-200 text-green-900 font-bold text-sm rounded shadow-xl ">
                                        Paid : {salary_amount}
                                    </span>

                                    <span className="px-4 py-1 bg-blue-200 text-darkblue-500 font-bold text-sm rounded shadow-xl ">
                                        Total : {salary_amount}
                                    </span>
                                </div>


                                <div className="flex justify-between">
                                    <div className="px-6 py-3 font-bold text-darkblue-500 ">
                                        <h2>* Paid by :  {payment == 1 ? 'Cash' : payment == 2 ? 'UPI' : 'Cheque'}</h2>
                                        {payment != 1 ? <h2>* {payment == 2 ? "UPI NO" : payment == 3 ? "Cheque No" : null} :  {payment == 2 ? upi_no : payment == 3 ? chaque_no : null}</h2> : null}
                                        <h3 >* Received by  : <span className="uppercase">{admin.username}</span></h3>
                                    </div>
                                    <div>

                                        <div className="border-2 mx-8 mt-6  w-fit flex items-center border-secondory-text">
                                            <input
                                                type="password"
                                                className="p-1 px-3 outline-none "
                                                placeholder="Enter Security PIN"
                                                onChange={(e) => { setPin(e.target.value); setError(false) }}
                                            />
                                            <button
                                                className={`px-4 py-1 bg-darkblue-500 text-white ${isLoadingOnSubmit ? 'opacity-40' : 'opacity-100'} `}
                                                disabled={isLoadingOnSubmit}
                                                onClick={handlePINsubmit}
                                            >
                                                {isLoadingOnSubmit ? 'Loading...' : 'SUBMIT'}
                                            </button>
                                        </div>
                                        {error && (
                                            <h1 className=" text-red-700  mx-7 text-sm px-1 my-1 font-bold">
                                                *Please Enter Valid PIN
                                            </h1>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div
                    className={`bg-student-100 h-full px-12  py-6 ${model && "opacity-5"} `}>
                    <div className="flex justify-between items-center">
                    <h1 className="font-bold text-3xl text-darkblue-500 ">
                        Update Salary Receipt
                    </h1>
                    <div className="group h-9 w-20 flex justify-center items-center gap-1 cursor-pointer" id="" onClick={() => navigate(-1)}>
                        <IoIosArrowBack className="text-2xl font-bold group-hover:text-blue-700 text-darkblue-500 mt-[3px]" />
                        <span className=" text-xl text-darkblue-500 font-semibold group-hover:text-blue-700">Back</span>
                    </div>

                    </div>
                    <div className="bg-white px-1 py-5 mt-9 shadow-2xl rounded-2xl ">
                        <div className="flex pt-4  justify-between  relative">
                            <div className="space-y-2  text-sm ">
                                <h1 className="bg-darkblue-500 text-blue-50 px-8 flex justify-center text-sm ">
                                    {" "}
                                    Receipt No : {faculty.salary_receipt_id}
                                </h1>
                            </div>
                            <div className="p-6 pt-0 font-serif">
                                <h3 className=""> Date : {date}</h3>
                            </div>
                        </div>
                        <div className="flex items-center px-6">
                            <h2 className="font-bold text-lg uppercase ">Name : {faculty.staff_id.basic_info_id.full_name}</h2>
                        </div>
                        <div className="flex justify-between ">
                            <div className="left ">
                                <div className="salary_type">
                                    <div className="flex items-center space-x-2 py-4 px-6">
                                        <strong className="text-xl"> Salary Type :</strong>
                                        <input
                                            type="radio"
                                            name="salary"
                                            id="fixed"
                                            className=""
                                            value="0"
                                            checked={is_hourly == 0 ? "checked" : null}
                                            onChange={handleFixed}
                                        />
                                        <span> Fixed Salary </span>

                                        <input
                                            type="radio"
                                            name="salary"
                                            id="lectured"
                                            className=""
                                            value="1"
                                            checked={is_hourly == 1 ? "checked" : null}
                                            onClick={handleLecture}
                                        />
                                        <span> Per Lecture </span>
                                    </div>
                                    {toggle ? (
                                        <div>
                                            <div className="flex border-2 mx-6 border-secondory-text w-fit  rounded-lg">
                                                <h1> </h1>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Total hour"
                                                    className=" placeholder-black p-1 outline-none border-2 m-1"
                                                    value={salaryData.hour}
                                                    onChange={(e) =>{
                                                        const regex = new RegExp(/^[0-9]+$/)
                                                        
                                                        setHourRateEmptyError(false);

                                                        if(!regex.test(e.target.value)){
                                                        setHourRateError(true)
                                                        }
                                                        else{
                                                        setHourRateError(false)
                                                        }
                                                        setSalaryData({ ...salaryData, hour: e.target.value })
                                                    }}
                                                />

                                                <input
                                                    type="text"
                                                    placeholder="Enter Rate "
                                                    className=" placeholder-black outline-none p-1 border-2 m-1"
                                                    value={salaryData.amount}
                                                    onChange={(e) =>{
                                                        const regex = new RegExp(/^[0-9]+$/)
                                                        
                                                        setHourRateEmptyError(false);

                                                        if(!regex.test(e.target.value)){
                                                        setHourRateError(true)
                                                        }
                                                        else{
                                                        setHourRateError(false)
                                                        }
                                                        setSalaryData({ ...salaryData, amount: e.target.value })
                                                    }}
                                                />

                                                {
                                                    <button
                                                        className="bg-darkblue-500 font-bold text-white px-5"
                                                        onClick={calculateSalary}
                                                    >
                                                        Submit
                                                    </button>
                                                }
                                            </div>
                                            {
                                                hourRateError 
                                                ?
                                                <h1 className=" text-red-700  mx-6 text-xs px-1 my-1 font-bold">
                                                    *Please enter only numbers
                                                </h1>
                                                :
                                                null
                                            }                                        
                                            {
                                                hourRateEmptyError 
                                                ?
                                                <h1 className=" text-red-700  mx-6 text-xs px-1 my-1 font-bold">
                                                    *Both fields are required
                                                </h1>
                                                :
                                                null
                                            }                                        
                                            </div>
                                    ) : null}
                                </div>
                                <div className="flex px-6 justify-between items-center pt-4">
                                    <div className="flex items-center border-2 border-secondory-text w-fit rounded-3xl">
                                        <span className="py-2 bg-darkblue-500 text-white mr-2 font-bold border-2 border-secondory-text rounded-full p-2">
                                            <FaRupeeSign />
                                        </span>
                                        <input
                                            type="text"
                                            name="amount"
                                            id="amount"
                                            placeholder="Enter amount"
                                            disabled={amount}
                                            className="px-2 mr-4 text-xl rounded-r-full font-bold outline-none w-36 pr-2"
                                            value={salary_amount}
                                            onChange={(e) => { 
                                                const regex = new RegExp(/^[0-9]+$/)

                                                if(!regex.test(e.target.value)){
                                                setamounterror(true)                           
                                                }
                                                else{
                                                setamounterror(false)
                                                }
                                                setsalaryamount(e.target.value)
                                            }}
                                        />

                                    </div>
                                </div>{amounterror && (
                                    <h1 className=" text-red-700  mx-6 text-xs px-1 my-1 font-bold">
                                        *Please Enter Valid Amount
                                    </h1>
                                )}
                            </div>

                            <div className=" right payment_type mt-2">
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center space-x-2 py-4 px-6">
                                        <strong className="text-xl">By : </strong>
                                        <input
                                            type="radio"
                                            name="paymethod"
                                            id="Cash"
                                            className=""
                                            value="1"
                                            checked={cash == 1 ? "checked" : null}

                                            onChange={handleCash}
                                        />
                                        <span> Cash </span>
                                        <input
                                            type="radio"
                                            name="paymethod"
                                            id="upi"
                                            className=""
                                            value="2"
                                            checked={upi == 1 ? "checked" : null}

                                            onChange={handleUpi}
                                        />
                                        <span> UPI </span>
                                        <input
                                            type="radio"
                                            name="paymethod"
                                            id="cheque"
                                            className=""
                                            value="3"
                                            checked={chaque == 1 ? "checked" : null}
                                            onChange={handleCheque}
                                        />
                                        <span> Cheque </span>
                                    </div>
                                    {upi ? (
                                        <div>
                                            <div className="flex border-2 mx-6 border-darkblue-500 w-fit rounded-md">
                                                <h1></h1>
                                                <input
                                                    type="text"
                                                    placeholder="Enter UPI Number"
                                                    className=" placeholder-black p-1 outline-none rounded-md"
                                                    name="upi_no"
                                                    defaultValue={upi_no ? upi_no : ""}
                                                    onChange={(e) => { setupino(e.target.value); setupierror(false) }}
                                                />
                                            </div>{upierror && (
                                                <h1 className=" text-red-700  mx-6 text-xs px-1 my-1 font-bold">
                                                    {" "}
                                                    *Please Enter UPI Number
                                                </h1>
                                            )}
                                        </div>
                                    ) : null}
                                    {chaque ? (
                                        <div className="flex mx-4">
                                            <div>
                                                <div className="flex border-2 mx-6 border-darkblue-500 w-fit rounded-md">
                                                    <h1> </h1>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Cheque Number"
                                                        className=" placeholder-black p-1 outline-none rounded-md"
                                                        name="cheque_no"
                                                        defaultValue={chaque_no ? chaque_no : ""}
                                                        onChange={(e) => { 
                                                            const regex = new RegExp(/^[0-9]+$/)

                                                            if(!regex.test(e.target.value)){
                                                            setchaqueerror(true)
                                                            }
                                                            else{
                                                            setchaqueerror(false) 
                                                            }
                                                            setchaqueno(e.target.value);
                                                        }}
                                                    />

                                                </div>{chaqueerror && (
                                                    <h1 className=" text-red-700  mx-6 text-xs px-1 my-1 font-bold">
                                                        {" "}
                                                        *Please Enter Valid Cheque Number
                                                    </h1>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end mx-2">
                                                <div className="flex border-2 border-darkblue-500 w-fit rounded-md ">
                                                <Tooltip content="Cheque date" placement="bottom-end" className='text-white bg-black rounded p-2'>
                                                    <span>
                                                    <input
                                                        type="date"
                                                        value={chequeDate}
                                                        className="placeholder-black p-1 rounded-md outline-none"
                                                        onChange={handleChequeDate}
                                                    />
                                                    </span>
                                                </Tooltip>
                                                </div>
                                                {chequeDateError && (
                                                <h1 className={`text-red-700 ml-auto ${!chequeDateError ? 'ml-6' : ''} text-xs px-1 my-1 font-bold`}>
                                                    *Please Select Valid Cheque Date
                                                </h1>
                                                )}
                                            </div>
                                        </div>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                        <div className="text-sm flex justify-between items-center uppercase font-bold font-mono mt-8 ">
                            <h1 className="px-6"> admin : {admin.username}</h1>
                            <button onClick={genreciept}
                                className="px-7  mx-7 py-2 text-base tracking-widest font-semibold uppercase bg-darkblue-500 text-white 
            transition duration-500 rounded-md hover:shadow-2xl"  >
                                UPDATE
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}












