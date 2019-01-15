import Roadmap from "../src/basic.roadmap-extended.json";

const Link = ({ model, type }) => {
    const isVideos = type === "videos";
    const isWiki = type === "wiki";
    const isSites = type === "sites";
    const isPlaylist = type === "youtube_playlists";
    const isBooks = type === "books";

    let bookInfo;
    if (isBooks) {
        bookInfo = model.meta.items.find(e =>
            e.type.includes("http://schema.org/Book")
        );

        return (
            bookInfo && (
                <div
                    style={{ width: 300, border: "2px solid #ddd", margin: 24 }}
                >
                    <a
                        href={model.url}
                        style={{ display: "block", padding: 24 }}
                    >
                        <h3>
                            <span>{bookInfo.properties.name}</span>
                        </h3>
                    </a>
                    <img
                        src={bookInfo.properties.image[0]}
                        width={300}
                        height={140}
                        style={{ objectFit: "cover" }}
                    />
                    <div style={{ padding: 24 }}>
                        <div style={{ marginTop: 24 }}>
                            author: <b>{bookInfo.properties.author}</b>
                        </div>
                        <div>
                            pages: <b>{bookInfo.properties.numberOfPages}</b>
                        </div>
                        {bookInfo.properties.aggregateRating && (
                            <div>
                                rating:{" "}
                                <b>
                                    {bookInfo.properties.aggregateRating &&
                                        bookInfo.properties.aggregateRating[0]
                                            .properties.ratingValue}
                                    /
                                    {
                                        bookInfo.properties.aggregateRating[0]
                                            .properties.reviewCount
                                    }
                                </b>
                            </div>
                        )}
                    </div>
                </div>
            )
        );
    }

    if (isPlaylist) {
        return (
            <div style={{ width: 300, border: "2px solid #ddd", margin: 24 }}>
                <a href={model.youtube ? `https://www.youtube.com/embed?listType=playlist&list=${model.youtube.channelId}`: model.url} style={{ display: "block", padding: 24 }}>
                    <h3>
                        <span>{model.youtube ? model.youtube.owner : model.title || model.url}</span>
                    </h3>
                </a>
                {model.youtube && (
                    <>
                        <img
                            src={model.youtube.channelThumbnailUrl}
                            width={300}
                            height={140}
                            style={{ objectFit: "cover" }}
                        />
                        <div style={{padding: 24}}>
                            <div>
                                <b>INFO</b>
                            </div>
                            <div>owner: {model.youtube.owner}</div>
                            <div>genre: {model.youtube.genre}</div>
                        </div>
                    </>
                )}
            </div>
        );
    }
    return (
        <div style={{ width: 350, border: "2px solid #ddd", margin: 24 }}>
            {!isWiki && !isSites && (
                <img
                    src={model.thumbnail}
                    width={350}
                    height={180}
                    style={{ objectFit: "cover" }}
                />
            )}
            <div style={{ padding: 24, position: "relative" }}>
                <div>
                    <a href={model.url}>
                        <h3>
                            {!isWiki && !isSites && (
                                <img
                                    src={model.siteIcon}
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                        display: "block",
                                        background: "white",
                                        overflow: "hidden",
                                        position: "absolute",
                                        top: "-24px",
                                        border: "2px solid white"
                                    }}
                                    width='48'
                                    height='48'
                                />
                            )}
                            <span>{model.title || model.url}</span>
                        </h3>
                    </a>
                </div>
                {/* <div
                    style={{ marginTop: 24 }}
                    dangerouslySetInnerHTML={{ __html: model.description }}
                /> */}
                <div style={{ color: "#ccc", marginTop: 24 }}>
                    {model.keywords}
                </div>
            </div>
        </div>
    );
};

const Sources = ({ model }) => {
    return (
        <div style={{ marginBottom: 64, marginLeft: 64 }}>
            <h3 style={{ textTransform: "uppercase" }}>{model.type}</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {model.links.map(e => (
                    <Link key={e.url} type={model.type} model={e} />
                ))}
            </div>
        </div>
    );
};

const Node = ({ model, index }) => {
    return (
        <div style={{ marginLeft: 64 }}>
            <h1>
                {index}. {model.name}
            </h1>

            {model.sources.map(e => (
                <Sources key={e.type} model={e} />
            ))}

            {model.children && (
                <div>
                    {model.children.map((e, index2) => (
                        <Node
                            key={e.name}
                            index={`${index}-${index2}`}
                            model={e}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default () => (
    <div>
        {Roadmap.roadmap.map((e, index) => (
            <Node key={e.name} index={index} model={e} />
        ))}
    </div>
);
