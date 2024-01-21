import './Policy.css'

function Policy({ number, title, description }) {
    return (
        <div>
            <h5>
                <span>{number}</span>
                <span>{title}</span>
            </h5>
            <p className="body_text">{description}</p>
        </div>
    )
}

export default Policy