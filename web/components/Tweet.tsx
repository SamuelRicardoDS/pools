export function Tweet(props: any) {
    return(
        <div>
            <h1>tweet</h1>
            <p>{props.text}</p>
            <button>curtir</button>
        </div>
    )
}