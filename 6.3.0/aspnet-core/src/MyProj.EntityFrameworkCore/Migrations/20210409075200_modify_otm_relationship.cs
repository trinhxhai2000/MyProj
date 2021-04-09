using Microsoft.EntityFrameworkCore.Migrations;

namespace MyProj.Migrations
{
    public partial class modify_otm_relationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TinhId",
                table: "Huyen",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TinhId",
                table: "Huyen");
        }
    }
}
