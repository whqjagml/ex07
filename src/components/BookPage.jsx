import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row, Form, Card } from 'react-bootstrap'
import Book from './Book';

const BookPage = () => {
    const [list,setList] = useState([]);
    const [loading, setLoding] = useState(false);
    const [page, setPage] = useState(1);
    const [is_end, setIs_end] = useState(false);
    const [query, setQuery] = useState('리액터')
    const getData = async() => {
        const url="https://dapi.kakao.com/v3/search/book?target=title";
        const config={
            headers: {"Authorization": "KakaoAK bd089b1ebcad6ba7757c9127960c80a8 "},
            params: {query: query, page:page, size:8}
        }
        const result= await axios.get(url, config); //async,await
        console.log(result);
        setList(result.data.documents); //데이터 출력 //ellipsis 한줄나오고 쩜쩜쩜
        setIs_end(result.data.meta.is_end);
        setLoding(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        getData();
    }
    useEffect (()=>{ //useEffect
        getData();
    }, [page]);
    if (loading) return <h1 className='text-center my-5'>로딩중.......</h1>
    return (
        <Row>
            <h1 className='text-center my-5'>도서검색</h1>
            <Row>
                <Col md={4}>
                <Form onSubmit={onsubmit}>
                    <Form.Control 
                    onChange={(e)=>setQuery(e.target.value)}
                    placeholder="검색어" value={query}/>
                    </Form>
                    </Col>
                {list.map(book=>
                <Col key={book.isbn} md={3} xs={6} className="my-2">
                <Card>
                    <Card.Body>
                        <img src={book.thumbnail}/>
                        <div className='ellipsis'>{book.title}</div> 
                        <Book book={book}/>
                    </Card.Body>
                </Card>
                </Col>
                    )}
                    <div className='text-center my-3'>
                        <Button onClick={()=>setPage(page-1)}
                        disabled = {page==1 && true}
                        Button className="btn-sm">이전</Button>
                        <span className="px-3">{page}</span>
                        <Button onClick={()=>setPage(page+1)}
                        disabled = {is_end && true}
                         Button className="btn-sm">다음</Button>
                        </div> 
            </Row>
        </Row>

    )
}

export default BookPage