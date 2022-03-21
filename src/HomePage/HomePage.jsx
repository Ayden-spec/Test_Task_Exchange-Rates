import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_actual_rate, get_last_ten_days_rate } from '../actions/action';

import Arrow from '../assets/arrow.png';
import './homepage.css'

function HomePage() {
    const [List_Select_ID, SetList_Select_ID] = useState(-1);
    const [Days, SetDays] = useState([]);

    const dispatch = useDispatch();
    const actual = useSelector(state => state.user.actual);
    const previous = useSelector(state => state.user.previous);

    useEffect(() => {
        dispatch(get_actual_rate(function (date_arr) {
            var date = new Date(date_arr)
            for (let i = 1; i < 11; i++) {
                let arr = Days
                date.setDate(date.getDate() - 1)
                dispatch(get_last_ten_days_rate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
                arr.push(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)
                SetDays(arr)
            }
        }))
    }, [])

    const find_obj = (element, name) => {
        if (previous.find(obj => obj.date === element)) {
            return previous.find(obj => obj.date === element).data[name]
        }
    }
    return (
        <div className='container'>
            <div className="terms_list_block">
                <div className='terms_block_label_img title'>
                    <label className='terms_label'>Букв. код</label>
                    <label className='terms_label'>Курс</label>
                    <label className='terms_label'>изменение курса</label>
                    <label className='terms_label'>Единиц</label>
                    <p  className="terms_checkbox_img rotate" />
                </div>
            </div>
            {
                actual.map((element, index) => (
                    <div key={index} onClick={() => SetList_Select_ID(index === List_Select_ID ? -1 : index)} className="terms_list_block">
                        <span className="tooltiptext">{element[1].Name}</span>
                        <div className='terms_block_label_img'>
                            <label className='terms_label'>{element[0]}</label>
                            <label className='terms_label'>{element[1].Value}</label>
                            <label className='terms_label'>{(((element[1].Value - element[1].Previous) / element[1].Previous) * 100).toFixed(5)}%</label>
                            <label className='terms_label'>{element[1].Nominal}</label>
                            <img src={Arrow} className={List_Select_ID === index ? "terms_checkbox_img" : "terms_checkbox_img rotate"} />
                        </div>
                        <div className={List_Select_ID === index ? "info__body_true" : "info__body_false"}>
                            <label className='terms_label'>Дата</label>
                            <label className='terms_label'>Курс</label>
                            <label className='terms_label'>Единиц</label>
                        </div>
                        {
                            Days.map((el) => (
                                <div key={`${el}_${index}`} className={List_Select_ID === index ? "info__body_true" : "info__body_false"}>
                                    <label className='terms_label'>{el}</label>
                                    <label className='terms_label'>{find_obj(el, element[0]) ? find_obj(el, element[0]).Value : '-'}</label>
                                    <label className='terms_label'>{find_obj(el, element[0]) ? find_obj(el, element[0]).Nominal : '-'}</label>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}
export default HomePage