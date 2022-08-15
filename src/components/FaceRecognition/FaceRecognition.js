import React from 'react';
import BoundingBox from './BoundingBox.js';

const FaceRecognition = ({imageUrl, box}) => {
	if (!box.length)
	{
		return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
			</div>
		</div>
		);
	}
	else{
		return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
				{	
					box.map(box => {
						return <BoundingBox box = {box} />
					})
				}
			</div>
		</div>
		);
	}
}

export default FaceRecognition;