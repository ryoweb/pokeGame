"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Zukan() {
    const [pokedex, setPokedex] = useState([]);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {

            const catchedPokes = JSON.parse(localStorage.getItem("catchedPokes") || "[]");
            setPokedex(catchedPokes);
        }
    }, []);

    const renderPokedex = () => {
        return Array.from(Array(1009).keys()).map((i) => {
            const poke = pokedex.find((pokemon) => pokemon.id === i + 1);
            const id = i + 1;
            console.log(id);

            return (
                <div
                    key={i}
                    style={{
                        width: "10%",
                        aspectRatio: "1/1",
                        boxSizing: "border-box",
                        padding: "5px",
                        margin: "5px",
                        float: "left",
                    }}
                >
                    {poke ? (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "1px solid #ddd",
                                borderRadius: "10%",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={poke.sprites}
                                alt={poke.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <p style={{ margin: "0", fontSize: "10px", textAlign: "center" }}>
                                {poke.id}
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "1px solid #ddd",
                                borderRadius: "10%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <p style={{ margin: "0", fontSize: "10px", width: "50%", height: "50%", textAlign: "center" }}>
                                ???
                            </p>
                            <p style={{ margin: "0", fontSize: "10px", width: "50%", height: "50%", textAlign: "center" }}>
                                {i + 1}
                            </p>
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        // <Link href={`/show-temoti/${id}`}>
        <div className="pokedex" style={{ display: "flex", flexWrap: "wrap" }}>
            {renderPokedex()}
        </div>
        // </Link>
    );
}