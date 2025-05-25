import { faIndianRupee } from '@fortawesome/free-solid-svg-icons/faIndianRupee'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export const InrIcon = (props: { color?: string }) => (
  <FontAwesomeIcon
    style={{ margin: 0, marginTop: 1.5, padding: 0 }}
    color={props.color}
    icon={faIndianRupee}
    size={12}
  />
)
