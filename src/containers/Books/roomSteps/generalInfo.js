import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import GenralForm from '../../../components/books/createGenralForm';
import salesActions from '../../../redux/sales/actions';

const GenralInfo = ({ event }) => {
  const dispatch = useDispatch();

  const { getSales } = salesActions;
  const { salesManList } = useSelector(({ sales }) => {
    return {
      salesManList: sales.sales,
    }
  });

  useEffect(() => {
    dispatch(getSales())
  }, [dispatch, getSales])

  return (
    <GenralForm salesManList={salesManList} event={event} />
  );
};

export default GenralInfo;
