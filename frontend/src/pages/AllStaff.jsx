import React, { useEffect } from "react";
import { useGetAllStaffQuery } from "../api/staff/staffApi";
import { selectToken, getUserIdToken } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";

function AllStaff() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const getAuth = async () => {
    return await auth.currentUser?.getIdToken();
  };
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetAllStaffQuery();
  useEffect(() => {
    if (!token) {
      dispatch(getUserIdToken());
    }
  }, [token]);
  console.log(currentData);
  return <div>AllStaff</div>;
}

export default AllStaff;
