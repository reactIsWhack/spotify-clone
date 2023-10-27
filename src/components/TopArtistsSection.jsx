import React from "react";
import MusicCard from "./MusicCard";

export default function TopArtistsSection({img, artist, title}) {

    return (
        <div className="artist-card">
            <MusicCard img={img} artist={artist} title={title} />
        </div>
    )
}