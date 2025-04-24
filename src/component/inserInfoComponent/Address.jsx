import React, { useEffect, useState } from 'react'
import CostomDorpDown from '../costomDropdown/dorpDown';

const Address = ({ handleAddress, address }) => {

    const addressList = [
        "서울특별시",
        "부산광역시",
        "대구광역시",
        "인천광역시",
        "광주광역시",
        "대전광역시",
        "울산광역시",
        "세종특별자치시",
        "경기도",
        "강원특별자치도",
        "충청북도",
        "충청남도",
        "전라북도",
        "전라남도",
        "경상북도",
        "경상남도",
        "제주특별자치도"
    ];



    return (
        <CostomDorpDown
            title="거주지역을 선택해주세요."
            plaseholder='거주지역을'
            styleValue='Address'
            options={addressList}
            onSelect={handleAddress}
            value={address} />
    )
}

export default Address
