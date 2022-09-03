import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import Loader from '../../../components/utility/loader';
import booksAction from '../../../redux/book/actions';
import BooksTable from '../../../components/books/booksTable';
import { Layout } from 'antd';
import { isEmpty } from '../../../helpers/utility.js';
import MButton from '@material-ui/core/Button';
import SeachEvent from '../../../components/books/searchModal';

const { getBooks, flushBooks } = booksAction;

const { Content } = Layout;

const AllBooks = (props) => {
  const { eventId } = props.match.params;

  const [books, setbooks] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const booksData = useSelector(({ books }) => books.books);
  const isLoading = useSelector(({ books }) => books.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks(eventId));
    return () => {
      dispatch(flushBooks());
    };
  }, [eventId, dispatch]);

  useEffect(() => {
    if (!isEmpty(booksData)) {
      setbooks(booksData);
    }
    else {
      setbooks([])
    }
  }, [booksData]);
  return (
    <LayoutWrapper>
      <Content style={{ padding: '0 20px', marginTop: '-10px' }}>
        {isLoading ? (
          <Loader />
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%' }}>
              <MButton
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  alignSelf: 'flex-end', marginBottom: '10px', width: '15%',
                  textTransform: 'capitalize'
                }}
                variant="contained"
                color='primary'
                onClick={() => setSearchModalVisible(true)}
              >
                Search
              </MButton>
            </div>
            <BooksTable users={books} title={'Books'} />
          </div>
        )}
        <SeachEvent visible={searchModalVisible} handleCancel={() => setSearchModalVisible(false)} />
      </Content>
    </LayoutWrapper>
  );
};

export default AllBooks;