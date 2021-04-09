using Microsoft.EntityFrameworkCore.Migrations;

namespace MyProj.Migrations
{
    public partial class _112709042021 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Huyen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TinhEntityId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Huyen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Huyen_Tinh_TinhEntityId",
                        column: x => x.TinhEntityId,
                        principalTable: "Tinh",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Huyen_TinhEntityId",
                table: "Huyen",
                column: "TinhEntityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Huyen");
        }
    }
}
