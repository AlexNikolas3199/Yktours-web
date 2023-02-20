import { Carousel, Image } from 'antd'
import { rooms } from '../utils/rooms'

const ChooseRoomModal = ({ data, routeTur }) => {
  const { room, color, deck } = data
  const cabin = rooms.find((item) => item.color === color)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ maxWidth: 470, width: '100%', flexGrow: 1 }}>
        <Image.PreviewGroup>
          <Carousel style={{ textAlign: 'center' }} infinite={false} autoplay>
            {cabin.imgs.map((image, index) => (
              <Image className='carousel-image' key={index} src={image} />
            ))}
          </Carousel>
        </Image.PreviewGroup>
      </div>
      <div className='text'>
        <p>
          <b>{cabin.h}</b>
        </p>
        <p>
          Палуба: <b>{deck}</b>
        </p>
        <p>
          Каюта: <b>{room}</b>
        </p>
        <p>
          Вместимость: <b>{cabin.max}</b>
        </p>
        <p>
          Цена: <b>{routeTur.Pricing[cabin.indx]} ₽</b>
        </p>
        <p>{cabin.p && '*' + cabin.p}</p>
      </div>
    </div>
  )
}

export default ChooseRoomModal
