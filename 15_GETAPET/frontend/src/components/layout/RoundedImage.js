import styles from './RoundedImage.module.css'

function RoundedImage({ src, alt }) {
  return <img className={styles.rounded_image} src={src} alt={alt} />
}

export default RoundedImage
