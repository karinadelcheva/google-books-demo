import { Annotation } from '../../repo/annotations.repository';

interface Props {
  annotations: Annotation[]
}
export default function Annotations(props: Props) {
  console.log(props)
  return (
    <div>
      {props.annotations.map( (annotation: Annotation) => (
        <div className='annotation' key={annotation.id}>
          <h3>{annotation.title}</h3>
          <p>{annotation.content}</p>
          <p>{annotation.id}</p>
          <p>{annotation.bookId}</p>

        </div>
      ))}
    </div>
  )
}