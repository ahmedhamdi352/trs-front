import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import BusForm from '../../components/books/busForm';
import salesActions from '../../redux/sales/actions';

const BusBook = (props) => {
  const dispatch = useDispatch();
  const { eventId } = props.match.params;


  const { getSales } = salesActions;
  const { salesManList } = useSelector(({ sales }) => {
    return {
      salesManList: sales.sales,
    }
  });

  const [sales, setSales] = useState([]);

  useEffect(() => {
    dispatch(getSales())
  }, [dispatch, getSales])

  useEffect(() => {
    setSales(salesManList)
  }, [salesManList, getSales])

  return (
    <BusForm salesManList={sales} event={eventId} />
  );
};

export default BusBook;
