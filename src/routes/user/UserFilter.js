import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Form, Button, Row, Col, DatePicker, Input, Cascader, Switch} from 'antd';
import {FilterItem} from '../../components'
import city from '../../utils/city';


const Search = Input.Search
const {RangePicker} = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  md: 8,
  xl: 4,
  style: {
    marginBottom: 16,
  }
}

const TwoColProps = {
  ...ColProps,
  sm: 24,
  md: 24,
  xl: 10
}

const UserFilter = ({
  filter,
  onFilterChange,
  onAdd,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue
  }
}) => {

  //查询方法
  const handleSubmit = () => {
    let fields = getFieldsValue();
    console.log("fields==>");
    console.log(fields);
    onFilterChange(fields);
  };

  //重置方法
  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields);
    handleSubmit();
  };

  //查询条件改变
  const handleChange = (key, values) => {
    let fields = getFieldsValue();
    fields[key] = values;
    fields = handleFields(fields);
    onFilterChange(fields);
  };

  //处理时间属性
  const handleFields = (fields) => {
    const {createTime} = fields;
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields;
  };

  //默认搜索条件
  const { name, address } = filter;

  let initialCreateTime = [];
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps}>
        {getFieldDecorator('name', {initialValue: name})(<Search placeholder="姓名" size="large"
                                                                 onSearch={handleSubmit}/>)}
      </Col>
      <Col {...ColProps}>
        {getFieldDecorator('address', {initialValue: address})(
          <Cascader
            size="large"
            style={{width: '100%'}}
            options={city}
            placeholder="请选择一个地址"
            onChange={handleChange.bind(null, 'address')}
          />)}
      </Col>
      <Col {...ColProps} xl={{span: 6}}>
        <FilterItem label="创建时间">
          {getFieldDecorator('createTime', {initialValue: initialCreateTime})(
            <RangePicker style={{width: '100%'}} size="large" onChange={handleChange.bind(null, 'createTime')}/>
          )}
        </FilterItem>
      </Col>

      <Col {...TwoColProps}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
            <Button size="large" onClick={handleReset}>重置</Button>
          </div>
          <div>
            <Button size="large" type="ghost" onClick={onAdd}>创建</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

UserFilter.propTypes = {
  filter: PropTypes.object,
  form: PropTypes.object,
  onAdd: PropTypes.func,
  onFilterChange: PropTypes.func
}

export default Form.create()(UserFilter)
